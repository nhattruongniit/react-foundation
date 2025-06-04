import React from 'react';

const withWallet = (WrappedComponent) => {
    class WithWallet extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                walletBalance: 0,
            };
        }

        componentDidMount() {
            // Simulate fetching wallet balance
            this.fetchWalletBalance();
        }

        fetchWalletBalance = () => {
            // Replace this with actual API call or logic
            const mockBalance = 100; // Example balance
            this.setState({ walletBalance: mockBalance });
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    walletBalance={this.state.walletBalance}
                />
            );
        }
    }

    return WithWallet;
};

export default withWallet;