import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { product } from './schema'
import { and, count, eq, like, asc, not } from 'drizzle-orm'
import { db } from './db'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

const PORT = process.env.PORT || 3000
const api = new Hono()

api.use('/*', cors())
api.use('/api/*', cors())
// Serve static files from the React app build directory
api.get('/*', serveStatic({ root: './dist' }))

// Create (POST) a new product
api.post('/products', async (c) => {
    try {
        const body = await c.req.json()
        const newProduct = await db.insert(product).values(body).returning()
        return c.json(newProduct[0], 201)
    } catch (error) {
        console.error('Error creating product:', error)
        return c.json(
            { error: 'An error occurred while creating the product' },
            500
        )
    }
})

// Read (GET) all products
api.get('/products', async (c) => {
    const query = c.req.query('query') ?? ''
    const page = Number.parseInt(c.req.query('page') ?? '1') || 1
    const itemsPerPage = 10
    const offset = (page - 1) * itemsPerPage
    let totalSearchResultsCount = 0

    try {
        const result = await db
            .select({ count: count() })
            .from(product)
            .where(
                and(
                    like(product.name, `%${query}%`),
                    eq(product.deleted, false)
                )
            )
            .get()

        if (result && typeof result.count === 'number') {
            totalSearchResultsCount = result.count
        }
    } catch (error) {
        console.error('Failed to fetch data from the database:', error)
    }

    const searchResults = await db
        .select()
        .from(product)
        .orderBy(asc(product.id))
        .where(
            and(like(product.name, `%${query}%`), eq(product.deleted, false))
        )
        .limit(itemsPerPage)
        .offset(offset)

    const totalPages = Math.ceil(totalSearchResultsCount / itemsPerPage)

    return c.json({ products: searchResults, totalPages, currentPage: page })
})

// Read (GET) a single product
api.get('/products/:id', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const p = await db
        .select()
        .from(product)
        .where(
            and(
                eq(product.id, id),
                not(like(product.image_url, '%archive.org%'))
            )
        )
    if (p.length === 0) {
        return c.notFound()
    }
    return c.json(p[0])
})

// Update (PUT) a product
api.put('/products/:id', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const body = await c.req.json()
    const updatedProduct = await db
        .update(product)
        .set(body)
        .where(eq(product.id, id))
        .returning()
    if (updatedProduct.length === 0) {
        return c.notFound()
    }
    return c.json(updatedProduct[0])
})

// Delete (DELETE) a product
api.delete('/products/:id', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const deletedProduct = await db
        .update(product)
        .set({ deleted: true })
        .where(eq(product.id, id))
        .returning()
    if (deletedProduct.length === 0) {
        return c.notFound()
    }
    return c.json(deletedProduct[0])
})

serve({ fetch: api.fetch, port: 3000 })

if (process.env.NODE_ENV === 'development') {
    console.log(`Server is running at http://localhost:${PORT}`)
}
