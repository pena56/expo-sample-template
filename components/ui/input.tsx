import * as React from 'react';
import { cn } from '@/lib/utils';
import { Platform, TextInput, type TextInputProps, View, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  className?: string;
  placeholderClassName?: string;
  /** Whether to show password toggle icon */
  secureTextEntry?: boolean;
  /** Whether the field has a validation error */
  hasError?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderClassName, secureTextEntry, hasError, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isSecureInput = secureTextEntry === true;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    // If it's a secure input, render with eye icon
    if (isSecureInput) {
      return (
        <View className="relative w-full">
          <TextInput
            ref={ref}
            secureTextEntry={!isPasswordVisible}
            className={cn(
              'font-cabinet flex h-[56px] w-full min-w-0 flex-row items-center rounded-[4px] border bg-background px-4 py-1 pr-12 text-base font-thin text-[#1B1B1E]',
              hasError ? 'border-error' : 'border-[#DFDFE1]',
              props.editable === false &&
                cn(
                  'opacity-50',
                  Platform.select({
                    web: 'disabled:pointer-events-none disabled:cursor-not-allowed',
                  })
                ),
              Platform.select({
                web: cn(
                  'outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground md:text-sm',
                  hasError
                    ? 'focus-visible:border-[#DC2626] focus-visible:ring-[3px] focus-visible:ring-[#DC2626]/20'
                    : 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                ),
                native: 'placeholder:text-[#B4B4BC]',
              }),
              className
            )}
            {...props}
          />
          <Pressable
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-0 flex h-[56px] items-center justify-center"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button">
            {isPasswordVisible ? (
              <Eye size={20} color="#B4B4BC" />
            ) : (
              <EyeOff size={20} color="#B4B4BC" />
            )}
          </Pressable>
        </View>
      );
    }

    // Regular input without eye icon
    return (
      <TextInput
        ref={ref}
        className={cn(
          'font-cabinet flex h-[56px] w-full min-w-0 flex-row items-center rounded-[4px] border bg-background px-4 py-1 text-base font-thin text-[#1B1B1E]',
          hasError ? 'border-error' : 'border-[#DFDFE1]',
          props.editable === false &&
            cn(
              'opacity-50',
              Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
            ),
          Platform.select({
            web: cn(
              'outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground md:text-sm',
              hasError
                ? 'focus-visible:border-[#DC2626] focus-visible:ring-[3px] focus-visible:ring-[#DC2626]/20'
                : 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            ),
            native: 'placeholder:text-[#B4B4BC]',
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
