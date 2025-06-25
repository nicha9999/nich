import { BaseModel } from "@adonisjs/lucid/orm"


export class DynamicModelService<T extends InstanceType<typeof BaseModel>> {
  private model: typeof BaseModel
  private primaryKeyColumn: string

  constructor(model: typeof BaseModel, primaryKeyColumn: string = 'id') {
    this.model = model
    this.primaryKeyColumn = primaryKeyColumn
  }

  /**
   * Insert a new record
   */
  public async insert(data: Partial<T>): Promise<T> {
    const record = await this.model.create(data)
    return record as T
  }

  /**
   * Update a record by primary key
   */
  public async update(primaryKeyValue: any, data: Partial<T>): Promise<T | null> {
    const whereClause = { [this.primaryKeyColumn]: primaryKeyValue }
    return this.updateBy(whereClause, data)
  }

  /**
   * Update a record by custom conditions
   */
  public async updateBy(whereConditions: Record<string, any>, data: Partial<T>): Promise<T | null> {
    // Fetch the existing record
    const record = await this.model.findBy(whereConditions)
    
    if (!record) {
      return null // Record not found
    }
    
    // Update the record with new data
    record.merge(data)
    
    // Save the updated record back to the database
    await record.save()
    
    return record as T
  }

  /**
   * Update multiple records by custom conditions
   */
  public async updateManyBy(whereConditions: Record<string, any>, data: Partial<T>): Promise<number> {
    // Use query builder for bulk update
    const query = this.model.query().where(whereConditions)
    const affectedRows = await query.update(data)
    return affectedRows[0] || 0 // Return number of affected rows
  }

  /**
   * Delete a record by primary key
   */
  public async delete(primaryKeyValue: any): Promise<T | null> {
    const whereClause = { [this.primaryKeyColumn]: primaryKeyValue }
    return this.deleteBy(whereClause)
  }

  /**
   * Delete a record by custom conditions
   */
  public async deleteBy(whereConditions: Record<string, any>): Promise<T | null> {
    // Fetch the existing record
    const record = await this.model.findBy(whereConditions)
    
    if (!record) {
      return null // Record not found
    }
    
    // Delete the record from the database
    await record.delete()
    
    return record as T
  }

  /**
   * Delete multiple records by custom conditions
   */
  public async deleteManyBy(whereConditions: Record<string, any>): Promise<number> {
    // Use query builder for bulk delete
    const query = this.model.query().where(whereConditions)
    const records = await query.delete()
    return records[0] || 0 // Return number of deleted rows
  }

  /**
   * Find a record by primary key
   */
  public async findByPrimaryKey(primaryKeyValue: any): Promise<T | null> {
    const whereClause = { [this.primaryKeyColumn]: primaryKeyValue }
    const record = await this.model.findBy(whereClause)
    return record as T | null
  }

  /**
   * Find a single record by custom conditions
   */
  public async findBy(whereConditions: Record<string, any>): Promise<T | null> {
    const record = await this.model.findBy(whereConditions)
    return record as T | null
  }

  /**
   * Find multiple records by custom conditions
   */
  public async findManyBy(whereConditions: Record<string, any>): Promise<T[]> {
    const records = await this.model.query().where(whereConditions)
    return records as T[]
  }

  /**
   * Find all records
   */
  public async findAll(): Promise<T[]> {
    const records = await this.model.all()
    return records as T[]
  }

  /**
   * Advanced query with complex conditions
   */
  public async updateByAdvanced(
    conditions: (query: any) => void,
    data: Partial<T>
  ): Promise<T | null> {
    const query = this.model.query()
    conditions(query)
    const record = await query.first()
    
    if (!record) {
      return null
    }
    
    record.merge(data)
    await record.save()
    return record as T
  }

  /**
   * Advanced delete with complex conditions
   */
  public async deleteByAdvanced(conditions: (query: any) => void): Promise<T | null> {
    const query = this.model.query()
    conditions(query)
    const record = await query.first()
    
    if (!record) {
      return null
    }
    
    await record.delete()
    return record as T
  }
}