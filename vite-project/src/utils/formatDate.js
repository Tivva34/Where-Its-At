export const formatDateShort = (dateString) => {
    if (!dateString) return { day: "N/A", month: "N/A" };
  
    const dateObj = new Date(dateString);
    
    if (isNaN(dateObj)) return { day: "N/A", month: "N/A" };
  
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "short" });
  
    return { day, month };
  };
  