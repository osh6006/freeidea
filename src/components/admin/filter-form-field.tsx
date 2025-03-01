import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { CalendarIcon } from 'lucide-react';

import { format } from 'date-fns';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RequestRadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type CommonFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'>;

interface CommonFormFieldPropsWithOptions<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends CommonFormFieldProps<TFieldValues, TName> {
  options: { label: string; value?: string }[];
}

export function RadioGroupFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  name,
  control,
}: CommonFormFieldPropsWithOptions<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              className="flex gap-4 items-center"
              value={field.value}
              onValueChange={field.onChange}
            >
              {options.map((option) => (
                <FormItem
                  className="flex gap-2 items-center"
                  key={option.value}
                >
                  <FormControl>
                    <RequestRadioGroupItem value={option.value || ''}>
                      {option.label}
                    </RequestRadioGroupItem>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  name,
  control,
}: CommonFormFieldPropsWithOptions<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl ref={field.ref}>
              <SelectTrigger className="w-fit space-x-2">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value || ''}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function InputFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
}: CommonFormFieldProps<TFieldValues, TName> & { placeholder?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DateRangeFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name }: CommonFormFieldProps<TFieldValues, TName>) {
  const formatStr = 'yy. MM. dd';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="flex w-[200px] items-center gap-2 typo-body-14-regular-150-tight"
              >
                <CalendarIcon className="size-4" />

                <span>
                  {field.value?.from ? (
                    field.value?.to ? (
                      <>
                        {format(field.value.from, formatStr)} -{' '}
                        {format(field.value.to, formatStr)}
                      </>
                    ) : (
                      format(field.value.from, formatStr)
                    )
                  ) : (
                    <>날짜를 선택해주세요.</>
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={field.value?.from}
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
