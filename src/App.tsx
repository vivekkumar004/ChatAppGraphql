import React from "react";
import "./App.css";
import ChatApp from "./components/ChatApp";
import AppContextProvider from "./context/AppContextProvider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Bounce, toast, ToastContainer } from "react-toastify";

function App() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        toast.error(`error occured with ${message}`);
      });
    }
    if (networkError) {
      toast.error("Please your network connection!");
    }
  });

  //normally get the link from env variables but for now I will put it here.
  const link = from([
    errorLink,
    new HttpLink({
      uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return (
    <React.StrictMode>
      <AppContextProvider>
        <ApolloProvider client={client}>
          <div className="App">
            <ChatApp />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
        </ApolloProvider>
      </AppContextProvider>
    </React.StrictMode>
  );
}

export default App;
