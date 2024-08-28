import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditableCellProps {
  value: string;
  onSave: (newValue: string) => void;
  onValueChange: (newValue: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  onValueChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    if (!isModalOpen) {
      setNewValue(value); // Reset to original value when the modal closes
    }
  }, [isModalOpen, value]);

  const handleSave = () => {
    onSave(newValue);
    onValueChange(newValue); // Notify the parent component of the edited value
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button onClick={() => setIsModalOpen(true)}>{value}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ویرایش اطلاعات</DialogTitle>
          </DialogHeader>
          <Textarea
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="h-fit "
          />
          <DialogFooter className="flex gap-4">
            <Button onClick={handleSave} variant="default">
              ذخیره
            </Button>
            <DialogClose asChild>
              <Button variant="outline">لغو</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditableCell;
