import React from "react";
import { connect } from "react-redux";
import { ListView } from "react-native";
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

import { loadBills } from "../../actions/bill";

const datas = [
  "Simon Mignolet",
  "Nathaniel Clyne",
  "Dejan Lovren",
  "Mama Sakho",
  "Alberto Moreno",
  "Emre Can",
  "Joe Allen",
  "Phil Coutinho"
];

class BillList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  componentDidMount() {
    this.props.loadBills();
  }
  render() {
    const { bills } = this.props;
    console.log(bills);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <Container>
        <Header />
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(bills)}
            renderRow={data => {
              return (
                <ListItem>
                  <Text> {data.type} --> {data.price} TL --> {data.status} </Text>
                </ListItem>
              );
            }}
            renderLeftHiddenRow={data => (
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
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
  loadBills: () => dispatch(loadBills())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillList);
