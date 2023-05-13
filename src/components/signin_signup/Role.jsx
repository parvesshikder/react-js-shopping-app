import create from 'zustand';


  const useRole = create((set) => ({
    role: "",
    choose: () => set((state) => ({ role: state.selectedValue })),
    
  }));

  export default useRole;