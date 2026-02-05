import { supabase } from './supabase';

// Save study material
export const saveStudyMaterial = async (userId, title, contentType, content, fileUrl = null) => {
    try {
        const { data, error } = await supabase
            .from('study_materials')
            .insert([
                {
                    user_id: userId,
                    title,
                    content_type: contentType,
                    content,
                    file_url: fileUrl
                }
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving study material:', error);
        throw error;
    }
};

// Get user's study materials
export const getStudyMaterials = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('study_materials')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching study materials:', error);
        throw error;
    }
};

// Save generated content
export const saveGeneratedContent = async (userId, studyMaterialId, contentType, content) => {
    try {
        const { data, error } = await supabase
            .from('generated_content')
            .insert([
                {
                    user_id: userId,
                    study_material_id: studyMaterialId,
                    content_type: contentType,
                    content
                }
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving generated content:', error);
        throw error;
    }
};

// Get generated content for study material
export const getGeneratedContent = async (studyMaterialId, contentType = null) => {
    try {
        let query = supabase
            .from('generated_content')
            .select('*')
            .eq('study_material_id', studyMaterialId);

        if (contentType) {
            query = query.eq('content_type', contentType);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching generated content:', error);
        throw error;
    }
};

// Delete study material
export const deleteStudyMaterial = async (materialId) => {
    try {
        const { error } = await supabase
            .from('study_materials')
            .delete()
            .eq('id', materialId);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting study material:', error);
        throw error;
    }
};
