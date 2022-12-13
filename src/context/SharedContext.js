import * as React from "react";
import { createContext, useState } from "react";

const SharedContext = createContext({
  clearActiveCards1: false,
  setClearActiveCards1: () => {},
  clearActiveCards2: false,
  setClearActiveCards2: () => {},
});

const SharedContextProvider = (props) => {
  const [clearActiveCards1, setClearActiveCards1] = useState(false);
  const [clearActiveCards2, setClearActiveCards2] = useState(false);
  React.useEffect(() => {
    if (clearActiveCards1 && clearActiveCards2) {
      setClearActiveCards1(false);
      setClearActiveCards2(false);
    }
  }, [clearActiveCards1, clearActiveCards2]);
  return (
    <SharedContext.Provider
      value={{
        clearActiveCards1: clearActiveCards1,
        setClearActiveCards1: (flag) => setClearActiveCards1(flag),
        clearActiveCards2: clearActiveCards2,
        setClearActiveCards2: (flag) => setClearActiveCards2(flag),
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export { SharedContext, SharedContextProvider };
