import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
    public async index({ response }: HttpContext) {
        const books = await Book.all();
        return response.ok(books);
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['title', 'author', 'kategori']);
        const books = await Book.create(data);
        return response.created(books);
    }

    public async show({ params, response }: HttpContext) {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ message: 'buku tidak ditemukan!' });
        }
        return response.ok(book);
    }

    public async update({ params, request, response }: HttpContext) {
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'buku tidak ditemukan!' });
        }
        const data = request.only(['title', 'author', 'kategori']);
        if (!data.title || !data.author || !data.kategori) {
            return response.badRequest({ message: 'Semua field harus diisi!' });
        }
        books.merge(data);
        await books.save();
        return response.ok(books);
    }

    public async destroy({ params, response }: HttpContext) {
        const books = await Book.find(params.id);
        if (books) {
            await books.delete();
            return response.noContent();
        } else {
            return response.notFound({ message: 'buku tidak ditemukan!' });
        }
    }
}