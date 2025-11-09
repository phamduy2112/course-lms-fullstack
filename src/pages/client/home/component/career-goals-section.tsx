import React from 'react'
import { Flag, BadgeCheck, GraduationCap } from "lucide-react";
import { Card } from '@/components/ui/card';
const CareerGoalsSection = () => {
    const goals = [
    {
      icon: <Flag className="w-6 h-6 text-indigo-500" />,
      title: "Khởi động một sự nghiệp mới",
      desc: "",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-indigo-500" />,
      title: "Nâng cao kỹ năng được thị trường lao động ưa chuộng",
      desc: "",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      title: "Nhận bằng",
      desc: "",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      title: "Nhận bằng",
      desc: "",
    },
  ];
  return (
    <section className='container mx-auto px-4 py-10'>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {goals.map((goal, i) => (
          <Card key={i} className="flex items-center justify-between p-6 bg-indigo-50 rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">{goal.title}</h3>
              {goal.desc && <p className="text-sm text-gray-600 mt-1">{goal.desc}</p>}
            </div>
            {goal.icon}
          </Card>
        ))}
      </div>

    
    </section>
  )
}

export default CareerGoalsSection