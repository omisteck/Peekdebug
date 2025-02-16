import React from 'react';
import { Moon01Icon, Sun03Icon, CheckmarkSquare02Icon } from "hugeicons-react";

function ThemeSetting({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-secondary' : 'text-primary'}`}>
            Select Your Theme
          </h1>

          {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className=" p-2 rounded-lg transition-colors
                dark:bg-secondary dark:bg-opacity-20 dark:hover:bg-opacity-30
                bg-primary bg-opacity-5 hover:bg-opacity-10"
            >
                {isDark ? (
                <Sun03Icon className="w-5 h-5 text-secondary" />
                ) : (
                <Moon01Icon className="w-5 h-5 text-primary" />
                )}
            </button>
        </div>
       <p className={`${isDark ? 'text-secondary text-opacity-70' : 'text-primary text-opacity-70'}`}>
         Choose a theme that suits your style and preferences.
       </p>
       
       <div className="grid grid-cols-2 gap-6 !pt-10">
         {/* Light Theme Button */}
         <button 
           onClick={() => toggleTheme()}
           className={`p-6 rounded-xl transition-all duration-300 text-left group relative
           ${!isDark 
             ? 'border-2 border-secondary shadow-lg transform scale-105' 
             : 'border-2 border-secondary border-opacity-10 hover:border-opacity-30'}`}
         >
           {!isDark && (
             <div className="absolute -top-2 -right-2 bg-secondary/50 rounded-full p-1">
               <CheckmarkSquare02Icon className="w-5 h-5 text-primary" />
             </div>
           )}
           <div className="w-full h-32 bg-white border border-primary border-opacity-5 rounded-lg mb-4 
             overflow-hidden relative group-hover:shadow-md transition-shadow">
             <div className="absolute inset-0 bg-gradient-to-br from-secondary via-white to-primary opacity-10
               group-hover:opacity-20 transition-opacity" />
           </div>
           <h3 className={`font-medium ${isDark ? 'text-secondary' : 'text-primary'}`}>Light Mode</h3>
           <p className={`text-sm mt-1 ${isDark ? 'text-secondary text-opacity-60' : 'text-primary text-opacity-60'}`}>
             Clean and bright interface
           </p>
         </button>

         {/* Dark Theme Button */}
         <button 
           onClick={() => toggleTheme()}
           className={`p-6 rounded-xl transition-all duration-300 text-left relative
           ${isDark 
             ? 'border-2 border-secondary shadow-lg transform scale-105' 
             : 'border-2 border-primary border-opacity-10 hover:border-secondary'}`}
         >
           {isDark && (
             <div className="absolute -top-2 -right-2 bg-secondary rounded-full p-1">
               <CheckmarkSquare02Icon className="w-5 h-5 text-primary " />
             </div>
           )}
           <div className="w-full h-32 bg-primary rounded-lg mb-4 overflow-hidden relative
             group-hover:shadow-md transition-shadow">
             <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary opacity-20
               group-hover:opacity-30 transition-opacity" />
           </div>
           <h3 className={`font-medium ${isDark ? 'text-secondary' : 'text-primary'}`}>Dark Mode</h3>
           <p className={`text-sm mt-1 ${isDark ? 'text-secondary text-opacity-60' : 'text-primary text-opacity-60'}`}>
             Easy on the eyes
           </p>
         </button>
       </div>
     </div>
    );
}

export default ThemeSetting;