import { createContext, useContext, useState } from 'react';
// looking at https://www.robinwieruch.de/react-usecontext-hook/

const testData = {
   thing1: {
      a: 1,
      b: 2
   },
   thing2: {
      a: 3,
      b: 4,
   },
}

const TestContext = createContext(null);
const useText = () => {
   const [ test, setTest ] = useContext(TestContext);
   const handleTest = value => setTest(value);
   return { value: test, onChange: handleTest };
}

const TestProvider = ({ children }) => {
   const [ test, setTest ] = useState(testData.thing1);

   return (
      <TestContext.Provider value={[test, setTest]}>
         {children}
      </TestContext.Provider>
   );
}

export { TestProvider, useText, testData };