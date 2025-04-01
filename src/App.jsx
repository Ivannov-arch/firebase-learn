import AuthComponent from "./sections/auth";
import Movies from "./sections/Movies";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex justify-center mx-auto w-[90vw]">
        <div className="max-w-[500px] mxau">
          Firebase learn{" "}
          <img
            className="inline"
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/google-firebase-console.png"
            alt="google-firebase-console"
          />{" "}
          <br /> <br />
          <AuthComponent />
          <Movies />
        </div>
      </div>
    </>
  );
}

export default App;
