// This is a mock API function that would be replaced with a real API call in a production app

export async function getBlogPostBySlug(slug: string) {
  // In a real app, this would fetch data from an API
  const post = {
    id: "1",
    title: "Top 10 Motorcycle Routes in Bali",
    slug: "top-10-motorcycle-routes-in-bali",
    excerpt: "Discover the most scenic and thrilling motorcycle routes in Bali, from coastal roads to mountain passes.",
    content: `
      <p>Bali, known for its stunning landscapes and vibrant culture, offers some of the most breathtaking motorcycle routes in Indonesia. From winding mountain roads to scenic coastal highways, there's something for every rider.</p>
      
      <h2>1. Mount Batur Loop</h2>
      <p>This scenic route takes you around the active volcano of Mount Batur, offering spectacular views of the crater lake and surrounding landscapes. The road is well-maintained and provides a perfect mix of straight stretches and curves.</p>
      
      <h2>2. Kintamani to Lovina</h2>
      <p>This northern route takes you from the highland area of Kintamani down to the coastal town of Lovina. The descent offers breathtaking views of the coastline and passes through traditional villages and coffee plantations.</p>
      
      <h2>3. Bedugul to Munduk</h2>
      <p>This highland route takes you through the cool, misty mountains of central Bali. You'll pass by the famous Bedugul lake temples, strawberry farms, and dense forests before reaching the traditional village of Munduk.</p>
      
      <h2>4. Uluwatu Coastal Road</h2>
      <p>This southern route follows the coastline of the Bukit Peninsula, offering stunning views of the Indian Ocean. The road passes by some of Bali's most famous surf spots and the iconic Uluwatu Temple perched on a cliff.</p>
      
      <h2>5. Sidemen Valley</h2>
      <p>This less-traveled route takes you through the picturesque Sidemen Valley, with its terraced rice fields and backdrop of Mount Agung. The narrow, winding roads offer a more challenging ride but reward you with authentic rural Balinese scenery.</p>
      
      <h2>6. Jatiluwih Rice Terraces</h2>
      <p>This UNESCO World Heritage site offers a scenic ride through some of Bali's most beautiful rice terraces. The road winds through the terraces, offering numerous photo opportunities and glimpses of traditional farming methods.</p>
      
      <h2>7. West Bali National Park</h2>
      <p>This remote western route takes you to the less-visited West Bali National Park. The road is less developed but offers a chance to see a different side of Bali, with its dry savannah landscapes and diverse wildlife.</p>
      
      <h2>8. Amed Coastal Road</h2>
      <p>This eastern coastal route follows the black sand beaches of Amed, known for its excellent snorkeling and diving spots. The road offers stunning views of Mount Agung rising above the coastline.</p>
      
      <h2>9. Campuhan Ridge Walk</h2>
      <p>While not exclusively a motorcycle route, the road leading to and from this famous walking trail in Ubud offers a scenic ride through lush valleys and traditional villages.</p>
      
      <h2>10. Kuta to Tanah Lot</h2>
      <p>This western route takes you from the busy tourist area of Kuta to the iconic sea temple of Tanah Lot. The road passes through rice fields and traditional villages before reaching the dramatic coastline.</p>
      
      <h2>Safety Tips for Riding in Bali</h2>
      <ul>
        <li>Always wear a helmet and appropriate protective gear</li>
        <li>Be aware of local traffic rules and customs</li>
        <li>Watch out for uneven road surfaces and unexpected obstacles</li>
        <li>Stay hydrated, especially in the tropical heat</li>
        <li>Carry a map or use GPS, as some rural areas may have limited signage</li>
      </ul>
      
      <p>Whether you're an experienced rider looking for a challenge or a casual tourist wanting to explore the island at your own pace, Bali's diverse motorcycle routes offer unforgettable experiences and views that you simply can't get from a car or tour bus.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=1200",
    publishedAt: "2023-06-15T10:00:00Z",
    readingTime: "5 min read",
    category: "Travel",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "John is an avid motorcyclist and travel writer who has explored Indonesia extensively on two wheels. He specializes in finding hidden gems and off-the-beaten-path destinations.",
    },
    tags: ["Bali", "Travel", "Routes", "Adventure", "Indonesia"],
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Check if the slug matches
  if (slug === post.slug) {
    return post
  }

  return null
}

