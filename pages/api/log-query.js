export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Received query:', req.body.query);
        res.status(200).json({ message: 'Query logged successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
