export let url;

if (process.env.NODE_ENV !== 'production') {
  url ="http://localhost:5000/api/v1"
} else {
  url ="http://localhost:5000/api/v1"
}
