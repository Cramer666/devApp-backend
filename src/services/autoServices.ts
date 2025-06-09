import { AutoModel } from '../models/auto';
import { Auto } from '../models/auto';

export class AutoService {
    async getAll() {
        return await AutoModel.find();
    }

    async getById(id: string) {
        return await AutoModel.findById(id);
    }

    async create(autoData: Omit<Auto, 'id'>) {
        const auto = new AutoModel(autoData);
        return await auto.save();
    }

    async update(id: string, updates: Partial<Auto>) {
        return await AutoModel.findByIdAndUpdate(id, updates, { new: true });
    }

    async delete(id: string) {
        return await AutoModel.findByIdAndDelete(id);
    }
}