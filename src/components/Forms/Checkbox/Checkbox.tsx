import React, { PropsWithChildren, forwardRef, useState, ReactElement } from 'react';
import { Control, FieldValues, RegisterOptions, useController, Path } from 'react-hook-form';
import { ColorDefinitions } from '../../../lib/utils/definitions';
import { ValidationState } from '../Input/Input';

export interface CheckboxProps extends PropsWithChildren {
    id?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    label?: string;
    infoText?: string;
    validationErrorMessage?: string;
    validationBottomPosition?: string;
    validationState?: ValidationState;
    color?: ColorDefinitions;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    css?: string;
}

const Checkbox = forwardRef(({
    id,
    defaultChecked,
    checked,
    label,
    infoText,
    validationErrorMessage,
    validationBottomPosition,
    validationState,
    color,
    readOnly,
    disabled,
    onChange,
    onBlur,
    css = '',
    children,
}: CheckboxProps,
    ref: React.Ref<any>
) => {
    const [checkedState, setCheckedState] = useState(!!defaultChecked);

    const handleChange = () => {
        if (checked === undefined) {
            setCheckedState(!checkedState);
            onChange?.(!checkedState);
        } else {
            onChange?.(!checked);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            handleChange();
        }
    };

    const formFieldCls = [
        'form-field',
        color ? `form-field-${color}` : '',
        validationErrorMessage && 'is-invalid',
        validationState === 'valid' && 'is-valid',
    ]
        .filter(Boolean)
        .join(' ');


    const cls = [
        'checkbox',
        css,
    ].filter(Boolean)
        .join(' ');

    return (
        <div className={formFieldCls}>
            <div className={cls} >
                <label htmlFor={id}>
                    <span className="sr-only">{label}</span> {/* screen-reader only */}
                    <input
                        id={id}
                        disabled={disabled}
                        readOnly={readOnly}
                        type="checkbox"
                        ref={ref}
                        checked={checked ?? checkedState}
                        onKeyDown={disabled ? undefined : handleKeyDown}
                        onChange={(e) => {
                            e.stopPropagation();
                            if (!disabled) {
                                handleChange();
                            }
                        }}
                        onBlur={onBlur}
                        aria-checked={checked ?? checkedState}
                        aria-disabled={disabled}
                        tabIndex={disabled ? undefined : 0}
                    />
                    <span className="checker">
                        <span className="check"></span>
                    </span>
                </label>
                <span>{label}</span>
            </div>

            {infoText ? <small className="form-text">{infoText}</small> : null}

            {validationErrorMessage ? (
                <span className="field-validation-error" style={validationBottomPosition ? { bottom: validationBottomPosition } : undefined}>
                    <span>{validationErrorMessage}</span>
                </span>
            ) : null}

            {children}
        </div>
    );
});

export interface FormCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
> extends Omit<CheckboxProps, 'onChange' | 'checked' | 'ref'> {
    rules?: Omit<
        RegisterOptions<TFieldValues>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: Path<TFieldValues>;
}

export const FormCheckbox = <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
>(
    props: FormCheckboxProps<TFieldValues, TContext, TTransformedValues>
): ReactElement => {
    const { control, rules, name, children, onBlur, ...rest } = props;

    const { field, fieldState } = useController({
        control,
        name,
        rules,
    });

    const wasInvalidRef = React.useRef(false);

    const hasError = !!fieldState.error;
    const hasValue = !!field.value;

    React.useEffect(() => {
        if (hasError) {
            wasInvalidRef.current = true;
        }
    }, [hasError]);

    const validationState: ValidationState = (() => {
        if (hasError) return 'invalid';

        if (wasInvalidRef.current && hasValue) return 'valid';

        return 'none';
    })();

    return (
        <Checkbox
            {...rest}
            ref={field.ref}
            checked={field.value}
            onChange={field.onChange}
            onBlur={(event) => {
                field.onBlur();
                onBlur?.(event);
            }}
            validationState={validationState}
            validationErrorMessage={fieldState.error?.message}
        >
            {children}
        </Checkbox>
    );
};

export default Checkbox;