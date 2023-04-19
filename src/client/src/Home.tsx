import { useDispatch } from "react-redux";
import { decrement, increment } from "./redux/reducers/counter.slice";

export const Home = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Home</h2>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}