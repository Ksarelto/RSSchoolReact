import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

export const About = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  
  return (
    <div>
      <h2>{count}</h2>
    </div>
  );
}