import React from "react";
import { connect } from "react-redux";
import { FlatList, Modal, View, TouchableHighlight, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text
} from "native-base";

import {
  loadBills,
  updateBill,
  deleteBill,
  subscribeBills
} from "../../actions/bill";
import BillListItem from "./BillListItem";

class BillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      isModalVisible: false,
      selectedBill: null
    };
  }

  componentDidMount() {
    this.props.loadBills();
    this.unsubscribe = this.props.subscribeBills();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggleModalVisible = selectedBill => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
      selectedBill: selectedBill
    }));
  };

  payBill = () => {
    const { updateBill } = this.props;
    const { selectedBill } = this.state;

    updateBill(selectedBill.id, {
      ...selectedBill,
      status: "PAID",
      paidBy: "User1"
    });
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
      selectedBill: null
    }));
  };

  render() {
    const { bills } = this.props;
    const { isModalVisible, selectedBill } = this.state;
    return (
      <Container>
        <Header />
        <Content>
          <FlatList
            data={bills}
            renderItem={({ item }) => (
              <BillListItem
                bill={item}
                onPayPress={() => this.toggleModalVisible(item)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Modal
            transparent
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              flex
              center
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "green"
              }}
            >
              <View>
                {selectedBill && (
                  <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    <BillListItem bill={selectedBill} payVisible={false} />
                  </View>
                )}
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 26,
                    color: "white"
                  }}
                >
                  Are you sure that you will pay this bill ?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <Button rounded danger onPress={this.toggleModalVisible}>
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      Cancel
                    </Text>
                  </Button>
                  <Button rounded success onPress={this.payBill}>
                    <Text
                      style={{
                        color: "white"
                      }}
                    >
                      PAY
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    bills: state.bill.bills || []
  };
};

const mapDispatchToProps = dispatch => ({
  loadBills: () => dispatch(loadBills()),
  subscribeBills: () => dispatch(subscribeBills()),
  updateBill: (id, payload) => dispatch(updateBill(id, payload)),
  deleteBill: id => dispatch(deleteBill(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillList);
