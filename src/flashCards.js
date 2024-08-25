import { useState, useEffect, useRef} from "react";
import "./app.css";
import { useGetFlashCardsQuery } from "./features/api/apiSlice";

const FlashCards = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetFlashCardsQuery();
  const [visibleCards, setVisibleCards] = useState(6);
  const lastCardRef = useRef(null);

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleCards]);

  function FlashCardsContent() {
    if (isLoading) return <p>Loading...</p>;
    else if (isError) return <p>{error}</p>;
    else if (isSuccess)
      return (
        <>
          <div 
            className="container"
          >
            {posts.slice(0, visibleCards).map((flashcard, index) => (
              <div 
                className="card" 
                key={flashcard.id}
                ref={index === visibleCards - 1 ? lastCardRef : null}
              >
                <h1 className="title">{flashcard.title}</h1>
                <hr></hr>
                <p className="body">{flashcard.body}</p>
              </div>
            ))}
          </div>
          <div className="button-container">
            <div>
              {visibleCards < posts.length ? (
                <button
                  className="button"
                  onClick={() => setVisibleCards(visibleCards + 6)}
                >
                  Load More
                </button>
              ) : (
                <button className="button" disabled>
                  All cards loaded
                </button>
              )}
            </div>
            <div>
              {visibleCards > 6 ? (
                <button className="button" onClick={() => setVisibleCards(visibleCards - 6)}>
                  Show Less
                </button>
              ) : (
                <button className="button" disabled>
                  Cannot show less cards
                </button>
              )}
            </div>
          </div>
        </>
      );
  }

  return (
      <div className = "mainDiv">
        <div className="headerDiv">
          <h1 className="header">
            Flashcards from <a className = "link" href = "https://jsonplaceholder.typicode.com/"> JSONPlaceholder</a> API
          </h1>
        </div>
        {/* <div className="flashCardsDiv"> */}
          <FlashCardsContent />
        {/* </div> */}
      </div>
  );
};

export default FlashCards;
