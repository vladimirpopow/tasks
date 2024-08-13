import React from "react";
import { BsCheck } from "react-icons/bs";
import  cn  from "classnames";

const Check = ({ isCompleted }) => {
    return (
        <div className={cn(
            'border-2 rounded-lg border-purple-600 w-6 h-6 mr-3 flex items-center justify-center',
            {
                'bg-purple-600': isCompleted,
            }
        )}>
            {isCompleted && <BsCheck size={24} className="text-white-600" />}
        </div>
    );
}

export default Check;
