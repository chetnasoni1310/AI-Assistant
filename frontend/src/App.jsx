// import { useState } from "react";
// import LandingPage from "./Component/LandingPage";
// import ChatUI from "./Component/ChatUI";
// function App() {
//   const [started, setStarted] = useState(false);

//   return (
//     <>
//       {!started ? (
//         <LandingPage onStart={() => setStarted(true)} />
//       ) : (
//         <ChatUI />
//       )}
//     </>
//   );
// }
// export default App;



/* eslint-disable no-unused-vars */
// App.jsx
import { useState } from "react";
import LandingPage from "./Component/LandingPage";
import ChatUI from "./Component/ChatUI";
import { AnimatePresence, motion as m } from "framer-motion";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black/5">
      <AnimatePresence mode="wait">
        {!started ? (
          <m.div
            key="landing"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            <LandingPage onStart={() => setStarted(true)} />
          </m.div>
        ) : (
          <m.div
            key="chat"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full min-h-screen"
          >
            <ChatUI />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
