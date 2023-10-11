"use client";

import React from 'react'
import { Button } from './ui/button'
import { Trash2Icon } from 'lucide-react'
import { deleteJV } from '@/server-actions/delete-jv';
import { toast } from 'react-hot-toast';

export default function DeleteButton({
  id
}: {
  id: string
}) {
  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={async () => {
        const allowed = confirm("Are you sure you want to delete this journal voucher?");
        if (allowed) {
          try {
            await deleteJV(id);
            toast.success("JV deleted successfully");
          } catch (error) {
            toast.error("Error deleting journal voucher");
          }
        }
      }}
    >
      <Trash2Icon className="w-4 h-4 mr-2" />
      Delete
    </Button>
  )
}
