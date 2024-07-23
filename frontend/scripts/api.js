// frontend/scripts/api.js
async function fetchWines(type) {
    const response = await fetch(`https://api.sampleapis.com/wines/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} wines`);
    }
    return response.json();
  }
  
  async function fetchAllWines() {
    try {
      const [reds, whites, roses, bubbles, desserts] = await Promise.all([
        fetchWines('reds'),
        fetchWines('whites'),
        fetchWines('roses'),
        fetchWines('sparkling'),
        fetchWines('dessert')
      ]);
      return { reds, whites, roses, bubbles, desserts };
    } catch (error) {
      console.error('Error fetching wines:', error);
    }
  }
  