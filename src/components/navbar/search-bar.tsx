'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from '../ui/form';
import SearchAutoComplete from './search-auto-complete';

const searchSchema = z.object({
  value: z.string({ required_error: '' }).min(1).max(50),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;

const SearchBar = () => {
  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      value: '',
    },
  });

  return (
    <div className="w-[380px] p-[8px]">
      <Form {...form}>
        <SearchAutoComplete />
      </Form>
    </div>
  );
};

export default SearchBar;
