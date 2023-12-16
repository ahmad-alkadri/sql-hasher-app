// hash-query.test.js

import handler from '../pages/api/hash-query';
import { createRequest, createResponse } from 'node-mocks-http';

// Mocking the external modules
jest.mock('pgsql-parser', () => ({
    parse: jest.fn().mockImplementation((query) => {
        // Simplified mock implementation of parse
        // For example, it can return an object with the query as a property
        return [{ type: 'mockParsedQuery', query: query }];
    }),
    deparse: jest.fn().mockImplementation((stmts) => {
        // Simplified mock implementation of deparse
        // Return a string that represents the deparsed query
        if (stmts && stmts.length > 0 && stmts[0].type === 'mockParsedQuery') {
            return `Deparsed: ${stmts[0].query}`;
        }
        return '';
    })
}));

jest.mock('crypto', () => ({
    createHash: jest.fn().mockImplementation(() => ({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('hashed_string')
    }))
}));

// Mock sqlite3 with an in-memory database
jest.mock('sqlite3', () => {
    const sqlite3 = jest.requireActual('sqlite3');
    return {
        Database: jest.fn().mockImplementation(() => new sqlite3.Database(':memory:'))
    };
});

describe('hash-query API', () => {
    test('handles valid SQL query', async () => {
        const req = createRequest({
            method: 'POST',
            body: { query: 'SELECT * FROM users;' }
        });
        const res = createResponse();

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toHaveProperty('hashedQuery');
    });

    test('rejects non-POST methods', async () => {
        const req = createRequest({
            method: 'GET',
        });
        const res = createResponse();

        await handler(req, res);

        expect(res._getStatusCode()).toBe(405);
    });

    // Additional tests...
});

