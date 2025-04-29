import AuthComponent from "./sections/auth";
import Movies from "./sections/Movies";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <div className="mx-auto max-w-[500px]">
          <img
            className="inline"
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/google-firebase-console.png"
            alt="google-firebase-console"
          />{" "}
          Firebase Movies <br /> <br />
        </div>
        <div className="flex flex-col justify-center mx-auto w-[90vw]">
          <div className="mx-auto max-w-[1000px]">
            <AuthComponent />
          </div>
          <div className="mx-auto max-w-[1000px]">
            <Movies />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
