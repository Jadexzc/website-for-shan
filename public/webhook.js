async function sendToBackend() {
  try {
    // Fetch visitor info
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-cache' });
    const visitorData = await res.json();

    const dataToSend = {
      ip: visitorData.ip,
      city: visitorData.city,
      region: visitorData.region,
      country: visitorData.country_name,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    console.log('Visitor data:', dataToSend);

    // Dynamically set the backend URL based on environment (local or production)
    const backendUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:3000/send-location' // Local development
      : 'https://website-for-shan.onrender.com/send-location'; // Production URL

    // Send visitor data to your backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    // Check if the response is successful
    if (!response.ok) {
      // If not, throw an error
      throw new Error(`Backend error: ${response.statusText}`);
    }

    // Log the response body for debugging
    const responseText = await response.text();
    console.log('Backend response:', responseText);

    // Try to parse the response as JSON
    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Parsed backend response:', result);
    } catch (err) {
      console.error('Failed to parse backend response:', responseText);
      throw new Error('Invalid JSON response from backend');
    }
  } catch (err) {
    console.error('Error sending visitor data:', err);
  }
}

// Call this function when the script loads
sendToBackend();
