import { SheetRegister, SheetDefinition } from 'react-native-actions-sheet';
import { SuccessSheet } from './success-sheet';

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'success-sheet': SheetDefinition<{
      payload: {
        title: string;
        subtitle: string;
        hideBackButton?: boolean;
      };
    }>;
  }
}

export const Sheets = () => {
  return <SheetRegister sheets={{ 'success-sheet': SuccessSheet }} />;
};
