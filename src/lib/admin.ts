
"use client";

export function getCookie(name: string): string | null {
  try {
    // console.log("🔍 Searching for cookie:", name);
    // console.log("All cookies:", document.cookie);
    
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      
    //   console.log(`Checking cookie: "${cookie}"`);
      
      // Remove single quotes from start and end if present
      if (cookie.startsWith("'") && cookie.endsWith("'")) {
        cookie = cookie.slice(1, -1);
      }
      
      // Check if this cookie starts with the name we want
      if (cookie.startsWith(name + '=')) {
        const value = cookie.substring(name.length + 1);
        // console.log(`✅ Found cookie ${name}:`, value);
        return value;
      }
    }
    
    // console.log(`❌ Cookie ${name} not found`);
    return null;
  } catch (error) {
    console.error("Cookie parsing error:", error);
    return null;
  }
}
export function isAdminFromAccess() {
  const token = getCookie("accessToken");

  if (!token) {
    return {
      isAdmin: false,
      token: null,
      user: null
    };
  }

  try {
    // Token parts validation
    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        isAdmin: false,
        token,
        user: null
      };
    }

    // Decode payload
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4) base64 += "=";

    const jsonPayload = atob(base64);
    const parsed = JSON.parse(jsonPayload);

    const isAdmin =
      parsed.role === "admin" ||
      parsed.access === "admin" ||
      parsed.isAdmin === true;

    return {
      isAdmin,
      token,
      user: parsed
    };
  } catch (error) {
    console.error("Failed to parse token:", error);

    return {
      isAdmin: false,
      token,
      user: null
    };
  }
}
