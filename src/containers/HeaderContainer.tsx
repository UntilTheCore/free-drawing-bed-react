import { User } from "leancloud-storage";
import { connect, ConnectedProps } from "react-redux";
import Header from "components/Header";

type RootState = {
  currentUser: User | undefined;
};

const mapState = (state: RootState) => ({
  currentUser: state.currentUser,
});

const mapDispatch = {
  getCurrentUser: () => ({ type: "get_current_user" }),
};

const connector = connect(mapState, mapDispatch);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export default connector(Header<Props>());
