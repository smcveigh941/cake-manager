const handlers = () => {
  const GET = (request, h) => {
    return h.view('test')
  }

  return {
    GET
  }
}

module.exports = {
  handlers
}