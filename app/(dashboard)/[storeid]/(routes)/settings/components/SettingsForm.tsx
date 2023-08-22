'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { store as Store } from '@prisma/client';
import { Trash } from 'lucide-react';

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        ></Heading>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => console.log('hi')}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      {/* <CommandSeparator /> */}
    </>
  );
};

export default SettingsForm;
