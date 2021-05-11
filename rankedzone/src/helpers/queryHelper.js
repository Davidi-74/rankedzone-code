const queryHelper = () => {
    const query2 = `query GetTokens {
    getTokens {
      csrf
      atkn
      sso
      lastUpdated
    }
   }`;


    let username = "Davidi74#2560";
    let platform = "battle";


    const query = `query GetProfile($username: String, $platform: String) {
    getProfile(username: $username, platform: $platform) {
      username
      level
      lifetime {
        kdRatio
      }
    }
  }`


    let resp = fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username, platform }
        })
    }).then(r => r.json())
        .then(data => console.log('data returned:', data));

}