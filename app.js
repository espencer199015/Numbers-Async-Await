 // Function to fetch a fact about a specific number using async/await
    async function fetchNumberFact(number) {
      try {
        const response = await fetch(`http://numbersapi.com/${number}?json`);
        const data = await response.json();
        return data.text;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    // Function to display the facts on the page
    function displayFacts(facts) {
      const factList = document.getElementById('fact-list');
      facts.forEach(fact => {
        const listItem = document.createElement('li');
        listItem.textContent = fact;
        factList.appendChild(listItem);
      });
    }

    // Function to get multiple facts about your favorite number using async/await
    async function getMultipleNumberFacts() {
      const favoriteNumber = 7;
      const numberOfFacts = 4;

      const fetchPromises = [];
      for (let i = 0; i < numberOfFacts; i++) {
        fetchPromises.push(fetchNumberFact(favoriteNumber));
      }

      try {
        const facts = await Promise.all(fetchPromises);
        displayFacts(facts);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Call the function to get and display multiple facts about your favorite number
    getMultipleNumberFacts();

    // Function to fetch a single card from a newly shuffled deck using async/await
    async function fetchSingleCard() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();
        return data.cards[0];
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    // Function to fetch two cards from the same deck using async/await
    async function fetchTwoCards() {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
        const data = await response.json();
        return data.cards;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    // Function to display the cards on the page
    function displayCards(cards) {
      const cardsContainer = document.getElementById('cards-container');
      cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.textContent = `${card.value} of ${card.suit}`;
        cardsContainer.appendChild(cardElement);
      });
    }

    // Fetch a single card and log its value and suit
    (async () => {
      const card = await fetchSingleCard();
      console.log(`${card.value} of ${card.suit}`);
    })();

    // Fetch two cards and log their values and suits
    (async () => {
      const cards = await fetchTwoCards();
      cards.forEach(card => {
        console.log(`${card.value} of ${card.suit}`);
      });
    })();