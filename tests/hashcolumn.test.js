import * as hashQueryModule from '../pages/api/hash-query';
import { parse, deparse } from 'pgsql-parser';
import { listScenario } from './hash_scenario';

describe('hashAllColumnRefObjects', () => {
    for (const scenario of listScenario) {
        it('should hash all column references in an object', async () => {

            const origQuery = scenario.original;
            const expectedHashedQuery = scenario.hashed;

            const obj = parse(origQuery);

            await hashQueryModule.hashAllColumnRefObjects(
                obj, 'ColumnRef', false);
            expect(deparse(obj)).toBe(expectedHashedQuery);

        });
    };
});
