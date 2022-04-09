export const userAction = (email, password) => ({ type: 'USER_LOGIN', email, password });

export const WalletAction = (currencies) => ({ type: 'WALLET', currencies });
