import { createContext, Dispatch, SetStateAction, useState } from "react";

type ChannelType = "General Channel" | "Technology Channel" | "LGTM Channel";

type UserType = "Joyse" | "Sam" | "Russell";

interface AppContextType {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
  channel: ChannelType;
  setChannel: Dispatch<SetStateAction<ChannelType>>;
}

export const AppContext = createContext<AppContextType>({
  user: "Joyse",
  setUser: () => {},
  channel: "General Channel",
  setChannel: () => {},
});

export default function AppContextProvider({
  children,
}: React.PropsWithChildren) {
  const [user, setUser] = useState<UserType>("Joyse");
  const [channel, setChannel] = useState<ChannelType>("General Channel");

  return (
    <AppContext.Provider value={{ user, setUser, channel, setChannel }}>
      {children}
    </AppContext.Provider>
  );
}
