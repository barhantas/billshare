import React from "react";
import { connect } from "react-redux";

import {
  Container,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Text,
  Input,
  Button
} from "native-base";

import { createBill } from "../../actions/bill";

import verificationCodeIcon from "../../../assets/sms-verification-image.png";

const PickerItemLabel = ({ iconType, iconName, text }) => (
  <>
    <Text>{text}</Text>
    <Icon type={iconType} name={iconName} />
  </>
);

class CreateBill extends React.Component {
  state = {
    type: null,
    price: null,
    status: null,
    description: null,
    paidBy: null
  };

  handleChange = (name, val) => this.setState({ [name]: val });

  onTypeChange(value) {
    this.setState({
      type: value
    });
  }

  onStatusChange(value) {
    this.setState({
      status: value
    });
  }

  onPaidByChange(value) {
    this.setState({
      paidBy: value
    });
  }

  createBill = () => {
    this.props.createBill(this.state);
  };

  render() {
    const { type, price, status, description, paidBy } = this.state;
    return (
      <Container>
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined, justifyContent: "center" }}
                placeholder="Select Bill Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={type}
                onValueChange={this.onTypeChange.bind(this)}
              >
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="FontAwesome"
                      iconName="plug"
                      text="Electricity"
                    />
                  }
                  value="ELECTRICITY"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="MaterialCommunityIcons"
                      iconName="radiator"
                      text="Gas"
                    />
                  }
                  value="GAS"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="Entypo"
                      iconName="water"
                      text="Water"
                    />
                  }
                  value="WATER"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="FontAwesome"
                      iconName="wifi"
                      text="Internet"
                    />
                  }
                  value="INTERNET"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="FontAwesome"
                      iconName="home"
                      text="Rent"
                    />
                  }
                  value="RENT"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="FontAwesome"
                      iconName="shopping-cart"
                      text="Market"
                    />
                  }
                  value="MARKET"
                />
                <Picker.Item
                  label={
                    <PickerItemLabel
                      iconType="MaterialCommunityIcons"
                      iconName="barcode-scan"
                      text="Other"
                    />
                  }
                  value="OTHER"
                />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="Price"
                value={price}
                onChangeText={v => this.handleChange("price", v)}
              />
              <Icon active type="FontAwesome" name="try" />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                value={description}
                onChangeText={v => this.handleChange("description", v)}
              />
              <Icon name="information-circle" />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Status"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={status}
                onValueChange={this.onStatusChange.bind(this)}
              >
                <Picker.Item label="Unpaid" value="UNPAID" />
                <Picker.Item label="Paid" value="PAID" />
              </Picker>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Paid by"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={paidBy}
                onValueChange={this.onPaidByChange.bind(this)}
              >
                <Picker.Item label="User1" value="USER1" />
                <Picker.Item label="User2" value="USER2" />
              </Picker>
            </Item>
          </Form>
          <Button block success onPress={this.createBill}>
            <Text>Success</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  createBill: formData => dispatch(createBill(formData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBill);
