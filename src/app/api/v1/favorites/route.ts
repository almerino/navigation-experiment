export async function GET(request: Request) {
  const favorites = [
    {
      id: "aaaa-aaaa-aaaa-aaaa",
      title: "Home",
      route: "/",
    },
    {
      id: "bbbb-bbbb-bbbb-bbbb",
      title: "Logs",
      route: "/logs",
    },
  ]

  return new Response(JSON.stringify(favorites), {
    status: 200,
  })
}
