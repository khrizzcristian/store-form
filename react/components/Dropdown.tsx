import React, { FC, useMemo } from 'react'
import { Dropdown as StyleguideDropdown } from 'vtex.styleguide'
import {
  Controller,
  UseSelectReturnType,
  useSelect,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'
import { BaseInputProps } from '../typings/InputProps'
import {getMessage} from "../utils/helpers";

export const DropdownInput: FC<BaseInputProps> = props => {
  const selectObject = useSelect(props.pointer)
  return <Dropdown selectObject={selectObject} label={props.label} labelId={props.labelId} />
}

export const Dropdown: FC<{
  selectObject: UseSelectReturnType
  label?: string
  labelId?: string
}> = props => {
  const { selectObject } = props
  const error = selectObject.getError()

  const subSchema = selectObject.getObject()
  const label = props.label ?? subSchema.title ?? selectObject.name
  const labelId = props.labelId

  const items = selectObject.getItems()
  const options = useMemo(() => {
    return items.map(value => {
      return { value, label: value }
    })
  }, [items])


  return (
    <>
      <Controller
        name={selectObject.pointer}
        control={selectObject.formContext.control}
        rules={selectObject.validator}
        as={
          <StyleguideDropdown
            name={label}
            multi={false}
            label={labelId ? getMessage(`store/form.label-${labelId}`) : label}
            options={options}
            error={!!error}
            errorMessage={useFormattedError(error)}
          />
        }
      />
    </>
  )
}
