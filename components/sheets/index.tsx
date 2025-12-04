import { SheetRegister, SheetDefinition } from 'react-native-actions-sheet';
import { SuccessSheet } from './success-sheet';
import { DeleteAccountSheet } from './delete-account-sheet';

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'delete-account-sheet': SheetDefinition;
    'success-sheet': SheetDefinition<{
      payload: {
        title: string;
        subtitle: string;
        hideBackButton?: boolean;
        useCheckImage?: boolean;
      };
    }>;
  }
}

export const Sheets = () => {
  return (
    <SheetRegister
      sheets={{ 'success-sheet': SuccessSheet, 'delete-account-sheet': DeleteAccountSheet }}
    />
  );
};
