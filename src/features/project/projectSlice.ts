import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProjectState {
  activeProjectId: string | null
}

const initialState: ProjectState = {
  activeProjectId: null
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<string | null>) => {
      state.activeProjectId = action.payload
    }
  }
})

export const { setActiveProject } = projectSlice.actions
export default projectSlice.reducer
