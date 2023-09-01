export class LocalStorageFallback implements Storage {
	#map: Map<string, string> = new Map<string, string>();

	public get length(): number {
		return this.#map.size;
	}

	public clear() {
		this.#map.clear();
	}

	public getItem(key: string): string | null {
		return this.#map.get(key) || null;
	}

	public key(index: number): string | null {
		return Array.from(this.#map.keys()).at(index) || null;
	}

	public removeItem(key: string): void {
		this.#map.delete(key);
	}

	public setItem(key: string, value: string): void {
		this.#map.set(key, value);
	}
}
