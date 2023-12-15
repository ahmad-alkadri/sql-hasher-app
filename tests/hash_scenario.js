export const listScenario = [
    {
        original: 'SELECT a FROM b;',
        hashed: 'SELECT ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb FROM b;'
    },
    {
        original: 'SELECT a, b FROM c;',
        hashed: `SELECT ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb,
3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d FROM c;`
    },
    {
        original: `SELECT employees.name, departments.department_name
        FROM employees
        JOIN departments ON employees.department_id = departments.id;`,
        hashed: `SELECT c49de3d265fb1d97d0fc104bbc54411ff3784bb1be48c5ce3a4f31a76f223469.82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89,
fc3bfaaef78740e2431bc75e8963bb164580f12f1039664ca278b2b07da5003c.500edf030bbbd42d0250f935f9989d3ac92b10ced2d8861fca7e019dc9ad4369 FROM employees INNER JOIN departments ON c49de3d265fb1d97d0fc104bbc54411ff3784bb1be48c5ce3a4f31a76f223469.f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1 = fc3bfaaef78740e2431bc75e8963bb164580f12f1039664ca278b2b07da5003c.a56145270ce6b3bebd1dd012b73948677dd618d496488bc608a3cb43ce3547dd;`
    },
    {
        original: `SELECT department_id, AVG(salary) AS average_salary
        FROM employees
        GROUP BY department_id;`,
        hashed: `SELECT f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1,
avg(6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf) AS average_salary FROM employees GROUP BY f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1;`
    },
    {
        original: `SELECT name, salary, department_id, 
SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date) AS running_total
FROM employees;`,
        hashed: `SELECT 82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89,
6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf,
f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1,
sum(6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf) OVER  (PARTITION BY f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1 ORDER BY c48f9e816116accd67b6e1bf83c8c428363d8714582830ab2e80800686975941) AS running_total FROM employees;`
    },
    {
        original: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) * 10 FROM employees);`,
        hashed: `SELECT 82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89,
6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf FROM employees WHERE 6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf > (SELECT avg(6384e43c02b1fbdfb9b4a7edc68afd75ea50031471f1bd8d843ccee19f4be1bf) * 10 FROM employees);`
    },
    {
        original: `SELECT name, COUNT(*)
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;`,
        hashed: `SELECT 82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89,
count(*) FROM employees GROUP BY 82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89 HAVING count(*) > 1;`
    },
    {
        original: `SELECT name, department_id
FROM employees
WHERE department_id IN (
    SELECT id
    FROM departments
    WHERE location = 'New York'
);`,
        hashed: `SELECT 82a3537ff0dbce7eec35d69edc3a189ee6f17d82f353a553f9aa96cb0be3ce89,
f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1 FROM employees WHERE f20c03dc773c134b88c83b4009999dd8754b394a00f8f29cb4579b9695fea5d1 IN (SELECT a56145270ce6b3bebd1dd012b73948677dd618d496488bc608a3cb43ce3547dd FROM departments WHERE e6eaea18e885e1078829b56df34896be5ab51439e8f0ba00cb1624b2c572c10e = 'New York');`
    }
];