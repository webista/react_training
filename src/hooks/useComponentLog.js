import { useEffect } from "react";

function useComponentLog(componentName) {
  useEffect(() => {
    console.log(`${componentName} is rendered for the first time`);
  }, [componentName]);
}

export default useComponentLog;
